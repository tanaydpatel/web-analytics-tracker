import React, { type CSSProperties } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const customStyle: Record<string, CSSProperties> | undefined = {
  ...solarizedlight,
  'pre[class*="language-"]': {
    ...solarizedlight['pre[class*="language-"]'],
    background: "transparent",
  },
  'code[class*="language-"]': {
    ...solarizedlight['code[class*="language-"]'],
    background: "transparent",
  },
};

import Button from "./Button";
interface InstallationSnippetProps {
  trackingId: string;
}

const InstallationSnippet: React.FC<InstallationSnippetProps> = ({
  trackingId,
}) => {
  const snippet = `<script>
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'analytics.start': new Date().getTime(),
      event: 'analytics.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'analytics' ? '&l=' + l : '';
    j.async = true;
    j.src = 'http://www.tanay-patel-analytics.com/the-tracking-script.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'analytics', '${trackingId}');
</script>
`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      alert("Snippet copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative flex w-full items-start justify-between rounded-xl border-2 border-[#e2e4e9] bg-[#f9f9f9] p-2">
      <SyntaxHighlighter
        language="javascript"
        style={customStyle}
        showLineNumbers
      >
        {snippet}
      </SyntaxHighlighter>
      <div className="absolute right-4 top-4">
        <Button
          label="Copy snippet"
          onClick={copyToClipboard}
          isDisabled={false}
        />
      </div>
    </div>
  );
};
export default InstallationSnippet;
