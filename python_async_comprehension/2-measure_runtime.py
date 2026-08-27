#!/usr/bin/env python3
"""Measure the runtime of asynchronous comprehensions."""

import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Execute four async comprehensions and return their total runtime."""
    start = time.time()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    end = time.time()
    return end - start
