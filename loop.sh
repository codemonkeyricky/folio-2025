for i in {1..10}; do
  ccr code  --dangerously-skip-permissions -p "Follow instructions in js-to-ts.txt" --output-format stream-json --verbose --include-partial-messages
done
