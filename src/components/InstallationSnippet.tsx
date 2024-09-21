import React from "react";
import Button from "./Button";

interface InstallationSnippetProps {
  userId: string;
}

const InstallationSnippet: React.FC<InstallationSnippetProps> = ({
  userId,
}) => {
  const snippet = `<script>
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'surface.start': new Date().getTime(),
      event: 'surface.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'surface' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.surface-analytics.com/tag.js?id=${userId}' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'surface', 'SURFACE_TAG_ID');
</script>
`;

  return (
    <div className="flex w-full items-start justify-between rounded-xl border-2 border-[#e2e4e9] bg-[#f9f9f9] p-5">
      <pre>
        <code>{snippet}</code>
      </pre>
      <Button
        label="Copy snippet"
        onClick={() => {
          alert("copied");
        }}
        isDisabled={false}
      />
    </div>
  );
};
export default InstallationSnippet;
