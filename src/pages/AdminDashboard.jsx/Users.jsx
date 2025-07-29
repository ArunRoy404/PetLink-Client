import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetUsersApi, useUpdateUserApi, useGetUserCountApi } from "../../axios/usersApi";
import {
    Button,
    IconButton,
    Typography,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Avatar,
    Badge
} from "@material-tailwind/react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    Shield,
    Ban,
    UserCheck,
    User
} from "lucide-react";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";

const columnHelper = createColumnHelper();

const Users = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [actionDialog, setActionDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(null); // 'make-admin', 'make-user', 'ban', 'unban'

    const { getUsersPromise } = useGetUsersApi();
    const { getUsersCountPromise } = useGetUserCountApi();
    const { getUpdateUserPromise } = useUpdateUserApi();
    const queryClient = useQueryClient();

    const handleUpdateUser = (userData) => {
        return getUpdateUserPromise(userData);
    };

    const handleActionClick = (user, type) => {
        setSelectedUser(user);
        setActionType(type);
        setActionDialog(true);
    };

    const confirmAction = () => {
        let updatedUser;

        if (actionType === 'make-admin') {
            updatedUser = { ...selectedUser, role: 'admin' };
        } else if (actionType === 'make-user') {
            updatedUser = { ...selectedUser, role: 'user' };
        } else if (actionType === 'ban') {
            updatedUser = { ...selectedUser, banned: true };
        } else if (actionType === 'unban') {
            updatedUser = { ...selectedUser, banned: false };
        }

        mutateUpdateUser(updatedUser);
        setActionDialog(false);
    };

    const {
        data: usersData,
        isLoading: usersLoading,
        refetch: refetchData,
    } = useQuery({
        queryKey: ["users", pagination],
        queryFn: () => getUsersPromise(pagination.pageIndex, pagination.pageSize).then((res) => res.data),
        keepPreviousData: true,
    });

    const { data: countData, refetch: refetchCount } = useQuery({
        queryKey: ["users-count"],
        queryFn: () => getUsersCountPromise().then((res) => res.data),
    });

    const { mutate: mutateUpdateUser } = useMutation({
        mutationFn: handleUpdateUser,
        onSuccess: () => {
            notifySuccess('User updated successfully');
            refetchData();
            refetchCount();
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['users-count']);
        },
        onError: () => {
            notifyError('Failed to update user');
        }
    });

    const handlePageSizeChange = (value) => {
        setPagination(prev => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 0,
        }));
    };

    const columns = [
        columnHelper.accessor((row, index) => index + 1 + pagination.pageIndex * pagination.pageSize, {
            id: "serial",
            header: () => "#",
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor("photoURL", {
            header: () => "Profile",
            cell: (info) => (
                <Avatar
                    src={info.getValue()}
                    alt={info.row.original.displayName}
                    size="sm"
                    className="border border-gray-200"
                />
            ),
        }),
        columnHelper.accessor("displayName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Name <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor("email", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Email <ArrowUpDown size={14} className="text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("role", {
            header: "Role",
            cell: (info) => (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${info.getValue() === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                </span>
            ),
        }),
        columnHelper.accessor("banned", {
            id: "status",
            header: "Status",
            cell: (info) => (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${info.getValue() ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {info.getValue() ? 'Banned' : 'Active'}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex flex-wrap gap-2">
                        {user.role !== 'admin' ? (
                            <Button
                                size="sm"
                                variant="outlined"
                                onClick={() => handleActionClick(user, 'make-admin')}
                                className="flex items-center border-primary text-primary gap-1"
                            >
                                <Shield size={16} /> Make Admin
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                color="gray"
                                variant="outlined"
                                onClick={() => handleActionClick(user, 'make-user')}
                                className="flex items-center gap-1"
                            >
                                <User size={16} /> Make User
                            </Button>
                        )}
                        {/* {!user.banned ? (
                            <Button
                                size="sm"
                                color="red"
                                variant="outlined"
                                onClick={() => handleActionClick(user, 'ban')}
                                className="flex items-center gap-1"
                            >
                                <Ban size={16} /> Ban
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                color="green"
                                variant="outlined"
                                onClick={() => handleActionClick(user, 'unban')}
                                className="flex items-center gap-1"
                            >
                                <UserCheck size={16} /> Unban
                            </Button>
                        )} */}
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: usersData || [],
        columns,
        pageCount: Math.ceil((countData || 0) / pagination.pageSize),
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    });

    return (
        <div className="p-3 lg:p-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <Typography variant="h4" className="font-bold text-gray-900 flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Users Management
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="text-gray-600">Show:</Typography>
                        <Select
                            value={pagination.pageSize.toString()}
                            onChange={handlePageSizeChange}
                            className="!min-w-20"
                        >
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                            <Option value="25">25</Option>
                        </Select>
                        <Typography variant="small" className="text-gray-600">entries</Typography>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="select-none px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {usersLoading && <TableSkeleton colSpan={columns.length} />}
                        {!usersLoading && !usersData?.length && (
                            <NoDataFoundTable message={"No users found."} colSpan={columns.length} />
                        )}
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-3 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div>
                    <Typography variant="small" className="text-gray-600">
                        Showing <span className="font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, countData || 0)}
                        </span>{' '}
                        of <span className="font-semibold">{countData || 0}</span> users
                    </Typography>
                </div>

                <div className="flex items-center gap-2">
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full"
                    >
                        <ChevronsLeft size={18} />
                    </IconButton>
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full"
                    >
                        <ChevronLeft size={18} />
                    </IconButton>

                    <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                            let pageNumber;
                            if (table.getPageCount() <= 5) {
                                pageNumber = i;
                            } else if (table.getState().pagination.pageIndex <= 2) {
                                pageNumber = i;
                            } else if (table.getState().pagination.pageIndex >= table.getPageCount() - 3) {
                                pageNumber = table.getPageCount() - 5 + i;
                            } else {
                                pageNumber = table.getState().pagination.pageIndex - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNumber}
                                    variant={table.getState().pagination.pageIndex === pageNumber ? "filled" : "text"}
                                    size="sm"
                                    onClick={() => table.setPageIndex(pageNumber)}
                                    className={`rounded-full ${table.getState().pagination.pageIndex === pageNumber ? 'bg-primary' : ''}`}
                                >
                                    {pageNumber + 1}
                                </Button>
                            );
                        })}
                    </div>

                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full"
                    >
                        <ChevronRight size={18} />
                    </IconButton>
                    <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full"
                    >
                        <ChevronsRight size={18} />
                    </IconButton>
                </div>
            </div>

            {/* Action Confirmation Dialog */}
            <Dialog open={actionDialog} handler={() => setActionDialog(false)}>
                <DialogHeader>
                    {actionType === 'make-admin' && 'Make Admin'}
                    {actionType === 'make-user' && 'Make Regular User'}
                    {actionType === 'ban' && 'Ban User'}
                    {actionType === 'unban' && 'Unban User'}
                </DialogHeader>
                <DialogBody>
                    {actionType === 'make-admin' && (
                        <div>
                            Are you sure you want to make <span className="font-bold">{selectedUser?.displayName}</span> an admin?
                            <div className="mt-2 text-sm text-gray-600">
                                Admins will have access to all admin routes and functionalities.
                            </div>
                        </div>
                    )}
                    {actionType === 'make-user' && (
                        <div>
                            Are you sure you want to make <span className="font-bold">{selectedUser?.displayName}</span> a regular user?
                            <div className="mt-2 text-sm text-gray-600">
                                User will lose admin privileges.
                            </div>
                        </div>
                    )}
                    {actionType === 'ban' && (
                        <div>
                            Are you sure you want to ban <span className="font-bold">{selectedUser?.displayName}</span>?
                            <div className="mt-2 text-sm text-gray-600">
                                Banned users won't be able to access the platform.
                            </div>
                        </div>
                    )}
                    {actionType === 'unban' && (
                        <div>
                            Are you sure you want to unban <span className="font-bold">{selectedUser?.displayName}</span>?
                            <div className="mt-2 text-sm text-gray-600">
                                User will regain access to the platform.
                            </div>
                        </div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setActionDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color={
                            actionType === 'make-admin' ? 'blue' :
                                actionType === 'make-user' ? 'gray' :
                                    actionType === 'ban' ? 'red' : 'green'
                        }
                        onClick={confirmAction}
                    >
                        {actionType === 'make-admin' && 'Confirm Make Admin'}
                        {actionType === 'make-user' && 'Confirm Make User'}
                        {actionType === 'ban' && 'Confirm Ban'}
                        {actionType === 'unban' && 'Confirm Unban'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Users;