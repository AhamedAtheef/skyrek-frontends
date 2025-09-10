
const AdminHeader = () => {
  const adminName = localStorage.getItem("adminName") || "Admin"; // fallback if null
  const firstLetter = adminName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl tracking-widest text-blue-800" id="premiumtext">CBC Cosmetic</h1>
      <div className="flex items-center items-between space-x-4">
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-green-800">{adminName}</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full text-center text-[22px] bg-gray-300">{firstLetter}</div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
