#!/usr/bin/env python3
"""This module provides a safely typed dictionary lookup function."""

from typing import Mapping, Any, Union, TypeVar

T = TypeVar('T')


def safely_get_value(
    dct: Mapping,
    key: Any,
    default: Union[T, None] = None
) -> Union[Any, T]:
    """Return the value for key if present, otherwise return default."""
    if key in dct:
        return dct[key]
    else:
        return default
