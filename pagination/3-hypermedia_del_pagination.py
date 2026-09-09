#!/usr/bin/env python3
"""This module provides deletion-resilient hypermedia pagination."""

import csv
from typing import Dict, List, Optional


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the dataset and indexed dataset caches."""
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Return the cached dataset of popular baby names."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Return the dataset indexed by its original position."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }

        return self.__indexed_dataset

    def get_hyper_index(
            self,
            index: Optional[int] = None,
            page_size: int = 10) -> Dict:
        """Return a deletion-resilient page starting at the given index."""
        dataset = self.indexed_dataset()

        assert index is None or (
            isinstance(index, int) and 0 <= index < len(dataset)
        )
        assert isinstance(page_size, int) and page_size > 0

        if index is None:
            index = 0

        data = []
        next_index = index

        while len(data) < page_size and next_index < len(dataset):
            if next_index in dataset:
                data.append(dataset[next_index])
            next_index += 1

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": next_index
        }
