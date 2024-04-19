import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Pagination = ({
	totalItems,
	rows = 10,
	onPageChange,
	filterCriteria,
}) => {
	const [pageno, setPageNo] = useState(1);
	const npages = Math.ceil(totalItems / rows);
	const MAX_PAGES_DISPLAYED = 2;

	const prePage = () => {
		if (pageno !== 1) {
			setPageNo(pageno - 1);
			onPageChange(pageno - 1, rows);
		}
	};

	const nextPage = () => {
		if (pageno !== npages) {
			setPageNo(pageno + 1);
			onPageChange(pageno + 1, rows);
		}
	};

	const changePage = (id) => {
		setPageNo(id);
		onPageChange(id, rows);
	};

	const startPage = Math.max(1, pageno - Math.floor(MAX_PAGES_DISPLAYED / 2));
	const endPage = Math.min(npages, startPage + MAX_PAGES_DISPLAYED - 1);

	const numbers = Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index
	);

	useEffect(() => {
		// Reset the page number to 1 whenever filter criteria changes
		setPageNo(1);
	}, [filterCriteria]);

	return (
		<>
			<div
				className="dataTables_paginate paging_simple_numbers"
				id="example5_paginate"
			>
				<Link
					className="paginate_button previous disabled"
					to="#"
					onClick={prePage}
					disabled={pageno === 1}
				>
					Previous
				</Link>

				<span>
					{numbers.map((n) => (
						<Link
							key={n}
							to="#"
							onClick={() => changePage(n)}
							className={`paginate_button  ${pageno === n ? "current" : ""}`}
						>
							{n}
						</Link>
					))}
				</span>

				<Link
					className="paginate_button next"
					to="#"
					onClick={nextPage}
					disabled={pageno === npages}
				>
					Next
				</Link>
			</div>
		</>
	);
};

export default Pagination;
