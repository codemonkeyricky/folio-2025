while true; do
  opencode run "Running npm run build and fix all errors"
  opencode run "git commit"
  npm run build
  exit_code=$?
  echo "Exit code: $exit_code" >> progress.txt
  if [ $exit_code -eq 0 ]; then
    echo "All errors fixed! Exiting loop."
    break
  else
    echo "Errors detected. Fixing and retrying..."
  fi
done
