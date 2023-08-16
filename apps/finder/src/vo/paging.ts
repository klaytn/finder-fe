import { WithPaging } from '../api/api'

export class PagingVO<Data, DataVO> {
    private readonly _results: readonly DataVO[]

    constructor(
        private readonly _rawData: WithPaging<Data> | undefined,
        readonly countOfPage: number,
        toVO: (data: Data) => DataVO,
    ) {
        this._results = _rawData?.results?.map(toVO) || []
    }

    get totalCount() {
        return this._rawData?.paging.totalCount || 0
    }

    get currentPage() {
        return this._rawData?.paging.currentPage || 0
    }

    get totalPage() {
        return this._rawData?.paging.totalPage || 0
    }

    get startIndex() {
        return (this.currentPage - 1) * this.countOfPage + 1
    }

    get results() {
        return this._results
    }
}
