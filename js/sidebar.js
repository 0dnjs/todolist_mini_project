const sidebarToggleButtonOnClickHandle = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button")

    if(sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen");
        sidebarToggleButton.innerHTML = '▼';
    }else {
        sidebar.classList.add("isSidebarOpen");
        sidebarToggleButton.innerHTML = '▲';
    }
}

const sidebarMenuOnClickHandle = (target) => {
    switch(target.innerHTML) {
        case "HOME":
            Routes.getInstance().routeState = "welcome";
            break;
            case "MAKE A PLAN":
                Routes.getInstance().routeState = "todolist";
                break;
    }
    Routes.getInstance().show();
    sidebarToggleButtonOnClickHandle();
}