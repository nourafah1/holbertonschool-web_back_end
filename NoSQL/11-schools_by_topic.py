#!/usr/bin/env python3
"""This module provides a function to find schools by topic."""


def schools_by_topic(mongo_collection, topic):
    """Return all schools that teach the specified topic."""
    return list(mongo_collection.find({"topics": topic}))
