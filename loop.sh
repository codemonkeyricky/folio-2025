for i in {1..3}; do
  filename=$(find sources/ | grep js$ | xargs wc | sort -hsr | tail -n1 | awk '{print $NF}')
  echo "$(date): Renaming $filename to .ts" >> progress.txt
  ccr code  --dangerously-skip-permissions -p "Rename $filename to .ts" --output-format stream-json --verbose --include-partial-messages
  echo "$(date): Running npm run build after $filename is renamed with typescript extension" >> progress.txt
  ccr code  --dangerously-skip-permissions -p "Run npm run build - fix all import errors after $filename is renamed with typescript extension" --output-format stream-json --verbose --include-partial-messages
  echo "$(date): Running npm run dev - fixing console errors" >> progress.txt
  ccr code  --dangerously-skip-permissions -p "Run npm run dev - and fix all console errors" --output-format stream-json --verbose --include-partial-messages
  # TODO: print progress to progress.txt
done
