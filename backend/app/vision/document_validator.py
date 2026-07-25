import io
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".pdf"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def validate_document(filename: str, file_bytes: bytes) -> dict:
    """
    Validates uploaded document for format, size, and image readability.
    Returns {"valid": bool, "error": str | None, "file_type": str}.
    """
    if not file_bytes or len(file_bytes) == 0:
        return {"valid": False, "error": "Uploaded file is empty.", "file_type": "unknown"}

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        return {"valid": False, "error": "File size exceeds 10MB limit.", "file_type": "unknown"}

    ext = "." + filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        return {
            "valid": False,
            "error": f"Unsupported file type '{ext}'. Please upload JPG, PNG, or PDF.",
            "file_type": ext,
        }

    file_type = "pdf" if ext == ".pdf" else "image"

    # For images, verify image integrity using Pillow if available
    if file_type == "image" and HAS_PIL:
        try:
            img = Image.open(io.BytesIO(file_bytes))
            img.verify()
        except Exception as e:
            return {
                "valid": False,
                "error": f"Corrupted or unreadable image file: {str(e)}",
                "file_type": "image",
            }

    return {"valid": True, "error": None, "file_type": file_type}
