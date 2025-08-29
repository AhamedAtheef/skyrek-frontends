export default function Paginator(props) {
    const { currentPage, totalPages, setCurrentPage, limit, setLimit, setLoading } = props;//deconstracting a json
    console.log(currentPage, totalPages, setCurrentPage, limit, setLimit, setLoading);

    // Make sure there is at least 1 option
    const pagesCount = totalPages > 0 ? totalPages : 1;

    return (
        <div className="w-full h-[50px] flex flex-col items-end justify-center gap-[20px] pt-[50px] pr-[30px] ">
            <div className="w-auto h-auto flex gap-[15px]">
                <div className="w-auto h-auto flex gap-[5px]">
                    <span className="text-gray-600">Show Page :-</span>
                    <select
                        name=""
                        className="w-[50px]  h-[30px] rounded-md focus:outline-[#459c71] focus:text-black text-[#0b7e3f] text-center pb-[px] cursor-pointer"
                        onChange={(e) => {
                            setLoading(true);
                            setCurrentPage(parseInt(e.target.value));
                        }}
                        value={currentPage}
                    >
                        {Array.from({ length: pagesCount }, (_, index) => (

                            <option key={index} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-auto h-auto flex gap-[5px]">
                    <span className="text-gray-600">Limit :-</span>
                    <select
                        className="w-[50px] h-[30px] rounded-md focus:text-black text-[#0b7e3f] focus:outline-[#459c71] text-center pb-[5px] cursor-pointer"
                        onChange={(e) => {
                            setLoading(true);
                            setLimit(parseInt(e.target.value));
                        }}
                        value={limit}
                    >
                        <option value="5" >5</option>
                        <option value="10" >10</option>
                        <option value="20" >20</option>
                        <option value="40" >40</option>
                    </select>
                </div>
            </div>
            <span className="text-gray-800">
                Page {currentPage} of {pagesCount}
            </span>
        </div>

    );
}
