import { ISortData, ITodoElement } from '../types';

type ComparerFunction = (
	a: ITodoElement | undefined,
	b: ITodoElement | undefined
) => number;
export const createSortComparer = (sortParams: ISortData): ComparerFunction => {
	switch (sortParams.field) {
		case 'comment': {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						return a!.comment.localeCompare(b!.comment);
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						return -a!.comment.localeCompare(b!.comment);
				  };
		}
		case 'name': {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						return a!.name.localeCompare(b!.name);
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						return -a!.name.localeCompare(b!.name);
				  };
		}
		case 'tags': {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						return a!.tags.length > b!.tags.length ? 1 : -1;
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						return a!.tags.length > b!.tags.length ? -1 : 1;
				  };
		}
		case 'createdDate': {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						const parsedDateA = Date.parse(a!.createdDate);
						// eslint-disable-next-line
						const parsedDateB = Date.parse(b!.createdDate);
						return parsedDateA > parsedDateB ? 1 : -1;
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						const parsedDateA = Date.parse(a!.createdDate);
						// eslint-disable-next-line
						const parsedDateB = Date.parse(b!.createdDate);
						return parsedDateA > parsedDateB ? -1 : 1;
				  };
		}
		case 'updatedDate': {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						const parsedDateA = Date.parse(a!.updatedDate);
						// eslint-disable-next-line
						const parsedDateB = Date.parse(b!.updatedDate);
						return parsedDateA > parsedDateB ? 1 : -1;
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						const parsedDateA = Date.parse(a!.updatedDate);
						// eslint-disable-next-line
						const parsedDateB = Date.parse(b!.updatedDate);
						return parsedDateA > parsedDateB ? -1 : 1;
				  };
		}
		default: {
			return sortParams.direction === 'asc'
				? (a, b): number => {
						// eslint-disable-next-line
						return a! > b! ? 1 : -1;
				  }
				: (a, b): number => {
						// eslint-disable-next-line
						return a! > b! ? -1 : 1;
				  };
		}
	}
};
