import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import Box from "../../../components/Box";
import { useSelector } from "react-redux";

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page

    const { cart } = useSelector(state => state.cart);

    const getInventories = async () => {
        try {
            const response = await service.get("/api/inventory");
            setInventory(response.data.elements);
            setLoading(false);
        } catch (error) {
            setLoading(true);
        }
    };

    useEffect(() => {
        getInventories();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    // Filtered inventory based on search input
    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredInventory.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        {(loading && <Loading />) || (
                            <>
                                <SidebarMain />
                                <div className="col-lg-9 col-md-9 dashboard-right-sec products-sec">
                                    <div className="row dashboard-right-top-sec">
                                        <div className="col-lg-12">
                                            <div className="products-search-box">
                                                <h3>Products</h3>
                                                <div className="input-and-btn-box">
                                                    <div className="input-box">
                                                        <label>Category</label>
                                                        <input
                                                            type="search"
                                                            placeholder="Search"
                                                            value={searchInput}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                    <div className="btn-box">
                                                        <a href="#">Search</a>
                                                        <Link to="/order">Create Order</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="products select-check-box">
                                                <form action="">
                                                    <div className="many-check-boxes">
                                                        {currentItems.map(item => (
                                                            <Box
                                                                key={item.id}
                                                                title={item.name}
                                                                total={item.price}
                                                                item={item}
                                                            />
                                                        ))}
                                                    </div>
                                                </form>
                                            </div>

                                            
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <div className="pagination">
                                                <ul className="pagination-list">
                                                    {pageNumbers.map(number => (
                                                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                            <button onClick={() => paginate(number)} className="page-link">
                                                                {number}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default InventoryList;
