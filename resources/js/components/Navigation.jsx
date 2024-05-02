import { Avatar, Dropdown, Navbar } from "flowbite-react";

function Navigation() {
    return (
        <>
            {/* <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar> */
            }
            <img src={'/front/images/Ocean-logo.png'} className="absolute top-12 left-0 right-0 mx-auto w-28 h-12 object-contain" />
        </>
    );
}
export default Navigation
