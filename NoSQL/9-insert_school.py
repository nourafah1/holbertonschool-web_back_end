#!/usr/bin/env python3
"""This module provides a function to insert a MongoDB document."""


def insert_school(mongo_collection, **kwargs):
    """Insert a new document and return its generated ID."""
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
