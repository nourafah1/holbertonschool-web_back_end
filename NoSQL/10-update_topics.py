#!/usr/bin/env python3
"""This module provides a function to update school topics."""


def update_topics(mongo_collection, name, topics):
    """Update the topics of all schools matching the given name."""
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
