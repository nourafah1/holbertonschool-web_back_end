#!/usr/bin/env python3
"""This module defines an asynchronous comprehension."""

from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect and return values from an asynchronous generator."""
    return [value async for value in async_generator()]
