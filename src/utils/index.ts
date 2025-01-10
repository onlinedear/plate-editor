/**
 * 格式化 HTML 字符串
 * @param {string} html - 需要格式化的 HTML 字符串
 * @param {number} indentSize - 缩进大小（默认为 2）
 * @returns {string} 格式化后的 HTML 字符串
 */
export function formatHtml(html: string, indentSize = 2): string {
  // 使用 DOMParser 解析 HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 递归遍历 DOM 树并生成格式化字符串
  function formatNode(node, level) {
    let result = '';
    const indent = ' '.repeat(level * indentSize);

    if (node.nodeType === Node.ELEMENT_NODE) {
      // 处理元素节点
      result += `${indent}<${node.tagName.toLowerCase()}`;

      // 添加属性
      if (node.attributes.length > 0) {
        for (const attr of node.attributes) {
          result += ` ${attr.name}="${attr.value}"`;
        }
      }

      if (node.childNodes.length > 0) {
        result += '>\n';
        // 递归处理子节点
        for (const child of node.childNodes) {
          result += formatNode(child, level + 1);
        }
        result += `${indent}</${node.tagName.toLowerCase()}>\n`;
      } else {
        // 自闭合标签
        result += ' />\n';
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      // 处理文本节点
      const text = node.textContent.trim();
      if (text) {
        result += `${indent}${text}\n`;
      }
    }

    return result;
  }

  // 从根节点开始格式化
  let formattedHtml = '';
  for (const child of doc.body.childNodes) {
    formattedHtml += formatNode(child, 0);
  }

  return formattedHtml.trim();
}
