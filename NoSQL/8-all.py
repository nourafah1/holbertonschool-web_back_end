#!/usr/bin/env python3
"""This module provides a function to list MongoDB documents."""


def list_all(mongo_collection):
    """Return a list containing all documents in a collection."""
    return list(mongo_collection.find())
