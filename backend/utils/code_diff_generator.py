"""Code diff generator for side-by-side comparison."""
import difflib
import logging
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

class CodeDiffGenerator:
    """Generates diffs between original and improved code."""
    
    @staticmethod
    def generate_diff(
        original_code: str,
        improved_code: str,
        language: str = "python"
    ) -> Dict[str, Any]:
        """Generate diff between two code snippets."""
        
        original_lines = original_code.splitlines(keepends=True)
        improved_lines = improved_code.splitlines(keepends=True)
        
        diff = difflib.unified_diff(
            original_lines,
            improved_lines,
            fromfile="original",
            tofile="improved",
            lineterm=""
        )
        
        diff_lines = list(diff)
        
        # Count changes
        additions = sum(1 for line in diff_lines if line.startswith("+") and not line.startswith("+++"))
        deletions = sum(1 for line in diff_lines if line.startswith("-") and not line.startswith("---"))
        
        return {
            "original": original_code,
            "improved": improved_code,
            "diff": "".join(diff_lines),
            "language": language,
            "statistics": {
                "additions": additions,
                "deletions": deletions,
                "total_changes": additions + deletions
            }
        }
    
    @staticmethod
    def generate_side_by_side(
        original_code: str,
        improved_code: str
    ) -> Dict[str, Any]:
        """Generate side-by-side comparison."""
        
        original_lines = original_code.splitlines()
        improved_lines = improved_code.splitlines()
        
        matcher = difflib.SequenceMatcher(None, original_lines, improved_lines)
        
        side_by_side = []
        for tag, i1, i2, j1, j2 in matcher.get_opcodes():
            if tag == "equal":
                for k in range(i2 - i1):
                    side_by_side.append({
                        "type": "equal",
                        "original": original_lines[i1 + k] if i1 + k < len(original_lines) else "",
                        "improved": improved_lines[j1 + k] if j1 + k < len(improved_lines) else ""
                    })
            elif tag == "delete":
                for k in range(i2 - i1):
                    side_by_side.append({
                        "type": "delete",
                        "original": original_lines[i1 + k] if i1 + k < len(original_lines) else "",
                        "improved": ""
                    })
            elif tag == "insert":
                for k in range(j2 - j1):
                    side_by_side.append({
                        "type": "insert",
                        "original": "",
                        "improved": improved_lines[j1 + k] if j1 + k < len(improved_lines) else ""
                    })
            elif tag == "replace":
                for k in range(max(i2 - i1, j2 - j1)):
                    side_by_side.append({
                        "type": "replace",
                        "original": original_lines[i1 + k] if i1 + k < len(original_lines) else "",
                        "improved": improved_lines[j1 + k] if j1 + k < len(improved_lines) else ""
                    })
        
        return {"side_by_side": side_by_side}
