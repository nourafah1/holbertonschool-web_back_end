#!/usr/bin/env python3
"""This module provides a function to safely get the first element."""

from typing import Sequence, Any, Optional


def safe_first_element(lst: Sequence[Any]) -> Optional[Any]:
    """Return the first element of a sequence or None if it is empty."""
    if lst:
        return lst[0]
    else:
        return None
