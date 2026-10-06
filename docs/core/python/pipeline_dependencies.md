# Python Pipeline Dependencies

This file is generated from static import scanning under `backend/pipeline`.
Regenerate with:
`python backend/pipeline/devtools/extract_pipeline_requirements.py --services-root backend --json-out docs/core/python/pipeline_dependencies.json --markdown-out docs/core/python/pipeline_dependencies.md --runtime-req-out docs/core/python/pipeline_runtime_requirements.in --test-req-out docs/core/python/pipeline_test_requirements.in`

## Runtime Python Packages

- `Pillow`
- `PyMuPDF`
- `fontTools`
- `pikepdf`
- `requests`
- `urllib3`

## Test-only Python Packages

- `docx`
- `pytest`

## External Commands

- `typst`
  refs: `build/lib/retainpdf_pipeline/foundation/config/external_tools.py`, `build/lib/retainpdf_pipeline/foundation/config/fonts.py`, `build/lib/retainpdf_pipeline/foundation/config/layout.py`, `build/lib/retainpdf_pipeline/foundation/config/output_layout.py`, `build/lib/retainpdf_pipeline/foundation/shared/job_dirs.py`, `build/lib/retainpdf_pipeline/foundation/shared/latex_commands.py`
- `gs`
  refs: `build/lib/retainpdf_pipeline/render/source/compression/ghostscript.py`, `build/lib/retainpdf_pipeline/render/source/preparation/hidden_text_strip.py`, `retainpdf_pipeline/render/source/compression/ghostscript.py`, `retainpdf_pipeline/render/source/preparation/hidden_text_strip.py`

## Package Map

| Import | Package | Runtime | Test | Example refs |
| --- | --- | --- | --- | --- |
| `PIL` | `Pillow` | yes | yes | `build/lib/retainpdf_pipeline/render/layout/inline_content/fallback/png_renderer.py`, `build/lib/retainpdf_pipeline/render/source/background/extract.py`, `build/lib/retainpdf_pipeline/render/source/background/patch.py` |
| `docx` | `docx` | no | yes | `devtools/tests/rendering/test_word_export.py` |
| `fitz` | `PyMuPDF` | yes | yes | `build/lib/retainpdf_pipeline/document_operations/visual_validation.py`, `build/lib/retainpdf_pipeline/ocr/ocr_provider/paddle_normalize.py`, `build/lib/retainpdf_pipeline/ocr/ocr_provider/paddle_runner.py` |
| `fontTools` | `fontTools` | yes | no | `build/lib/retainpdf_pipeline/foundation/config/fonts.py`, `retainpdf_pipeline/foundation/config/fonts.py` |
| `pikepdf` | `pikepdf` | yes | yes | `build/lib/retainpdf_pipeline/document_operations/page_program.py`, `build/lib/retainpdf_pipeline/render/document/pikepdf_overlay.py`, `build/lib/retainpdf_pipeline/render/document/pikepdf_pages.py` |
| `pytest` | `pytest` | no | yes | `devtools/tests/conftest.py`, `devtools/tests/document_operations/test_document_operation_cli.py`, `devtools/tests/document_operations/test_page_program.py` |
| `requests` | `requests` | yes | yes | `build/lib/retainpdf_pipeline/ocr/mineru_provider/mineru_api.py`, `build/lib/retainpdf_pipeline/ocr/ocr_provider/paddle_api.py`, `build/lib/retainpdf_pipeline/ocr/retry.py` |
| `urllib3` | `urllib3` | yes | no | `build/lib/retainpdf_pipeline/ocr/retry.py`, `build/lib/retainpdf_pipeline/translate/llm/providers/deepseek/transport.py`, `retainpdf_pipeline/ocr/retry.py` |

## Dependency Sources

- `pyproject.toml`
- `uv.lock`
- `pipeline/pyproject.toml`
- `ai/pyproject.toml`

## Generated Outputs

- `docs/core/python/pipeline_dependencies.json`
- `docs/core/python/pipeline_dependencies.md`
- `docs/core/python/pipeline_runtime_requirements.in`
- `docs/core/python/pipeline_test_requirements.in`
