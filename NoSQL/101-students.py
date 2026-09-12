#!/usr/bin/env python3
"""This module provides a function to rank students by average score."""


def top_students(mongo_collection):
    """Return all students sorted by their average score."""
    pipeline = [
        {
            "$addFields": {
                "averageScore": {
                    "$avg": "$topics.score"
                }
            }
        },
        {
            "$sort": {
                "averageScore": -1
            }
        }
    ]

    return list(mongo_collection.aggregate(pipeline))
