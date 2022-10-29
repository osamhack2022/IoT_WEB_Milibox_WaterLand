import { useState, useEffect } from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

interface PaginateProps extends ReactPaginateProps {
  onPaginate: (currentItems: any[]) => void;
  items: any[]
}

export const Paginate = (props: PaginateProps) => {
  const {
    pageCount: defaultPageCount,
    pageRangeDisplayed,
    breakLabel,
    nextLabel,
    previousLabel,
    pageClassName,
    breakClassName,
    nextClassName,
    previousClassName,
    className,
    activeClassName,
    items,
    onPaginate,
  } = props

  const [pageCount, setPageCount] = useState<number>(defaultPageCount)
  const [itemOffset, setItemOffset] = useState<number>(0)

  const itemPerPage = 5

  useEffect(() => {
    const endOffset = itemOffset + itemPerPage
    const currentItems = items.slice(itemOffset, endOffset)
    setPageCount(Math.ceil(items.length / itemPerPage))
    onPaginate(currentItems)
  }, [itemOffset])

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 5) % items.length
    setItemOffset(newOffset)
  }

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      breakLabel={<i className="fa-solid fa-ellipsis" />}
      nextLabel={<i className="fa-solid fa-angle-right" />}
      previousLabel={<i className="fa-solid fa-angle-left" />}
      pageClassName="px-3 py-1 rounded-lg"
      breakClassName="px-3 py-1 rounded-lg"
      nextClassName="px-3 py-1 rounded-lg"
      previousClassName="px-3 py-1 rounded-lg"
      className="flex"
      activeClassName="bg-primary text-white"
    />
  )
}
