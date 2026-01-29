"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Objects = void 0;
var Game_js_1 = require("./Game.js");
var i = 0;
var Objects = /** @class */ (function () {
    function Objects() {
        var _this = this;
        this.game = Game_js_1.Game.getInstance();
        this.list = new Map();
        this.key = 0;
        this.roundedViewPosition = { x: 0, z: 0 };
        this.game.ticker.events.on('tick', function () {
            _this.update();
        }, 4);
    }
    Objects.prototype.add = function (_visualDescription, _physicalDescription) {
        if (_visualDescription === void 0) { _visualDescription = null; }
        if (_physicalDescription === void 0) { _physicalDescription = null; }
        var object = {
            visual: null,
            physical: null,
            needsUpdate: false,
            reseting: false
        };
        /**
         * Visual
         */
        if (_visualDescription && _visualDescription.model) {
            // Default parameters
            var visualDescription_1 = __assign({ updateMaterials: true, castShadow: true, receiveShadow: true, parent: this.game.scene }, _visualDescription);
            // Visual
            var visual = {};
            visual.object3D = _visualDescription.model;
            visual.parent = visualDescription_1.parent;
            // Update materials
            if (visualDescription_1.updateMaterials)
                this.game.materials.updateObject(visualDescription_1.model);
            // Update shadows
            if (visualDescription_1.castShadow || visualDescription_1.receiveShadow) {
                visualDescription_1.model.traverse(function (_child) {
                    if (_child.isMesh) {
                        if (visualDescription_1.castShadow)
                            _child.castShadow = true;
                        if (visualDescription_1.receiveShadow)
                            _child.receiveShadow = true;
                    }
                });
            }
            // Add to scene
            if (visualDescription_1.parent !== null)
                visualDescription_1.parent.add(visual.object3D);
            // Save
            object.visual = visual;
        }
        /**
         * Physical
         */
        if (_physicalDescription) {
            object.physical = this.game.physics.getPhysical(_physicalDescription);
        }
        /**
         * Save physical in visual and vis versa
         */
        if (object.physical) {
            object.physical.body.userData = { object: object };
        }
        if (object.visual) {
            object.visual.object3D.userData.object = object;
        }
        /**
         * Save
         */
        this.key++;
        this.list.set(this.key, object);
        // If sleeping, not enabled or fixed apply transform directly
        if (object.visual && object.physical) {
            if (_physicalDescription.sleeping || !_physicalDescription.enabled || object.physical.type === 'fixed') {
                object.visual.object3D.position.copy(object.physical.body.translation());
                object.visual.object3D.quaternion.copy(object.physical.body.rotation());
            }
        }
        return object;
    };
    Objects.prototype.getFromModel = function (_model, _visualDescription, _physicalDescription) {
        if (_visualDescription === void 0) { _visualDescription = {}; }
        if (_physicalDescription === void 0) { _physicalDescription = {}; }
        var name = _model.name;
        var physical = !!name.match(/physical/i);
        var cleanUpRegexp = /physical|fixed|dynamic|kinematicPositionBased/gi;
        var colliders = [];
        if (physical) {
            // Define type
            if (typeof _physicalDescription.type === 'undefined') {
                _physicalDescription.type = 'fixed';
                if (_model.name.match(/dynamic/i))
                    _physicalDescription.type = 'dynamic';
                else if (_model.name.match(/kinematicPositionBased/i))
                    _physicalDescription.type = 'kinematicPositionBased';
            }
            // Restitution
            if (typeof _model.userData.restitution !== 'undefined')
                _physicalDescription.restitution = _model.userData.restitution;
            // Friction
            if (typeof _model.userData.friction !== 'undefined')
                _physicalDescription.friction = _model.userData.friction;
            // Category
            if (typeof _model.userData.category !== 'undefined')
                _physicalDescription.category = _model.userData.category;
            // // Collision (removed, too expensive)
            // if(_physicalDescription.type === 'dynamic')
            // {
            //     _physicalDescription.onCollision = (force, position) =>
            //     {
            //         this.game.audio.groups.get('hitDefault').playRandomNext(force, position)
            //     }
            // }
            _model.name = name.replaceAll(cleanUpRegexp, '');
            // Colliders
            var children = __spreadArray([], _model.children, true);
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var _child = children_1[_i];
                var collider = {
                    position: _child.position,
                    quaternion: _child.quaternion
                };
                if (_child.name.match(/^trimesh/i)) {
                    collider.shape = 'trimesh';
                    collider.parameters = [_child.geometry.attributes.position.array, _child.geometry.index.array];
                }
                else if (_child.name.match(/^hull/i)) {
                    collider.shape = 'hull';
                    collider.parameters = [_child.geometry.attributes.position.array, _child.geometry.index.array];
                }
                else if (_child.name.match(/^cuboid/i)) {
                    collider.shape = 'cuboid';
                    collider.parameters = [_child.scale.x * 0.5, _child.scale.y * 0.5, _child.scale.z * 0.5];
                }
                else if (_child.name.match(/^tube/i)) {
                    collider.shape = 'cylinder';
                    collider.parameters = [_child.scale.y * 0.5, _child.scale.x * 0.5];
                }
                else if (_child.name.match(/^ball/i)) {
                    collider.shape = 'ball';
                    collider.parameters = [_child.scale.y * 0.5];
                }
                if (typeof _child.userData.restitution !== 'undefined')
                    collider.restitution = _child.userData.restitution;
                if (typeof _child.userData.friction !== 'undefined')
                    collider.friction = _child.userData.friction;
                if (typeof _child.userData.category !== 'undefined')
                    collider.category = _child.userData.category;
                // Collider found
                if (collider.shape) {
                    // Save
                    colliders.push(collider);
                    // Remove
                    _child.removeFromParent();
                }
            }
        }
        // Add
        return [
            __assign(__assign({}, _visualDescription), { model: _model }),
            physical ? __assign(__assign({}, _physicalDescription), { colliders: colliders }) : null
        ];
    };
    Objects.prototype.addFromModel = function (_model, _visualDescription, _physicalDescription) {
        if (_visualDescription === void 0) { _visualDescription = {}; }
        if (_physicalDescription === void 0) { _physicalDescription = {}; }
        // Add
        return this.add.apply(this, this.getFromModel(_model, _visualDescription, _physicalDescription));
    };
    Objects.prototype.resetObject = function (object) {
        var _this = this;
        if (!object.physical ||
            (object.physical.type !== 'dynamic' && object.physical.type !== 'kinematicPositionBased') ||
            object.reseting)
            return;
        object.reseting = true;
        var isEnabled = object.physical.body.isEnabled();
        object.physical.body.setEnabled(false);
        object.physical.body.setTranslation(object.physical.initialState.position, false);
        object.physical.body.setRotation(object.physical.initialState.rotation, false);
        object.physical.body.setLinvel({ x: 0, y: 0, z: 0 }, false);
        object.physical.body.setAngvel({ x: 0, y: 0, z: 0 }, false);
        object.physical.body.resetForces();
        object.physical.body.resetTorques();
        // Wait a second and reactivate
        this.game.ticker.wait(1, function () {
            object.physical.body.setEnabled(isEnabled);
            // Sleep
            if (object.physical.initialState.sleeping)
                object.physical.body.sleep();
            object.reseting = false;
            _this.game.ticker.wait(1, function () {
                object.needsUpdate = true;
            });
        });
        if (object.visual) {
            if (object.visual.parent)
                object.visual.parent.add(object.visual.object3D);
            object.visual.object3D.position.copy(object.physical.initialState.position);
            object.visual.object3D.quaternion.copy(object.physical.initialState.rotation);
        }
    };
    Objects.prototype.resetAll = function () {
        var _this = this;
        this.list.forEach(function (object) {
            _this.resetObject(object);
        });
    };
    Objects.prototype.disable = function (object) {
        if (object.physical) {
            object.physical.body.setLinvel({ x: 0, y: 0, z: 0 }, false);
            object.physical.body.setAngvel({ x: 0, y: 0, z: 0 }, false);
            object.physical.body.resetForces();
            object.physical.body.resetTorques();
            object.physical.body.setEnabled(false);
        }
        if (object.visual)
            object.visual.object3D.removeFromParent();
    };
    Objects.prototype.enable = function (object) {
        if (object.physical)
            object.physical.body.setEnabled(true);
        if (object.visual)
            object.visual.parent.add(object.visual.object3D);
    };
    Objects.prototype.update = function () {
        var _this = this;
        var roundedViewPosition = {
            x: Math.round(this.game.view.focusPoint.position.x),
            z: Math.round(this.game.view.focusPoint.position.z)
        };
        var objectsNeedDistanceTest = false;
        if (roundedViewPosition.x !== this.roundedViewPosition.x || roundedViewPosition.z !== this.roundedViewPosition.z) {
            objectsNeedDistanceTest = true;
            this.roundedViewPosition.x = roundedViewPosition.x;
            this.roundedViewPosition.z = roundedViewPosition.z;
        }
        this.list.forEach(function (_object) {
            var position = _object.physical ? _object.physical.body.translation() : null;
            // Apply physical to visual
            if (_object.visual &&
                _object.physical &&
                (_object.needsUpdate ||
                    (!_object.physical.body.isSleeping() &&
                        _object.physical.body.isEnabled()))) {
                _object.needsUpdate = false;
                _object.visual.object3D.position.copy(position);
                _object.visual.object3D.quaternion.copy(_object.physical.body.rotation());
            }
            if (_object.physical) {
                // Felt in the floor => reset
                if (position.y < _this.game.water.depthElevation) {
                    _this.resetObject(_object);
                }
                // Far from view => Reset
                if (objectsNeedDistanceTest) {
                    var distanceToView = Math.hypot(_this.roundedViewPosition.x - position.x, _this.roundedViewPosition.z - position.z);
                    if (_object.physical.body.isEnabled() && !_object.physical.body.isSleeping() && distanceToView > _this.game.view.optimalArea.radius) {
                        _object.physical.body.sleep();
                    }
                }
            }
        });
    };
    return Objects;
}());
exports.Objects = Objects;
