for i in {1..10}; do
  filename=$(find sources/ | grep js$ | xargs wc | sort -hsr | tail -n1 | awk '{print $NF}')
  ccr code  --dangerously-skip-permissions -p "Run js-to-ts.txt against $filename" --output-format stream-json --verbose --include-partial-messages
done
