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
import { useDeletePetApi, useGetPetsApi, useGetPetsCountApi, useUpdatePetApi } from "../../axios/petsApi";
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
    Tooltip,
    Card,
    CardBody,
    Avatar,
    Chip,
} from "@material-tailwind/react";
import {
    Edit,
    Trash2,
    PawPrint,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    User,
    Mail,
    Phone,
} from "lucide-react";
import { useNavigate } from "react-router";
import TableSkeleton from "../../components/ui/TableSkeleton";
import NoDataFoundTable from "../../components/ui/NoDatafoundTable";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { useGetUserApi } from "../../axios/usersApi";

const columnHelper = createColumnHelper();

const AllPets = () => {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [userModal, setUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { getPetsPromise } = useGetPetsApi();
    const { getPetsCountPromise } = useGetPetsCountApi();
    const { deletePetPromise } = useDeletePetApi()
    const { updatePetPromise } = useUpdatePetApi();
    const { getUserPromise } = useGetUserApi()
    const queryClient = useQueryClient();

    // Handle soft delete by updating pet with deleted flag
    const handleDelete = (petId) => {
        return deletePetPromise(petId);
    };

    const handleStatusUpdate = ({ petData, adopted }) => {
        const updatedPet = { ...petData, adopted };
        return updatePetPromise(updatedPet);
    };

    const handleViewUser = async (email) => {
        if (email) {
            getUserPromise(email)
                .then(res => {
                    setSelectedUser(res.data)
                    setUserModal(true)
                })
                .catch(() => notifyError("Failed to fetch user details"))
        }

    };

    const {
        data: petsData,
        isLoading: petsLoading,
        refetch: refetchData,
    } = useQuery({
        queryKey: ["all-pets", pagination],
        queryFn: () => getPetsPromise(pagination.pageIndex, pagination.pageSize).then((res) => res.data),
        keepPreviousData: true,
    });

    const { data: countData, refetch: refetchCount } = useQuery({
        queryKey: ["all-pets-count"],
        queryFn: () => getPetsCountPromise().then((res) => res.data),
    });


    const { mutate: mutateDeletePet } = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            notifySuccess("Pet deleted successfully");
            refetchData();
            refetchCount();
            queryClient.invalidateQueries(["all-pets"]);
            queryClient.invalidateQueries(["all-pets-count"]);
        },
        onError: () => {
            notifyError("Failed to delete pet");
        },
    });

    const { mutate: mutateUpdatePetStatus } = useMutation({
        mutationFn: handleStatusUpdate,
        onSuccess: () => {
            notifySuccess("Pet status updated successfully");
            refetchData();
            refetchCount();
            queryClient.invalidateQueries(["all-pets"]);
            queryClient.invalidateQueries(["all-pets-count"]);
        },
        onError: () => {
            notifyError("Failed to update pet status");
        },
    });

    const handlePageSizeChange = (value) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 0,
        }));
    };

    const columns = [
        columnHelper.accessor((row, index) => index + 1 + pagination.pageIndex * pagination.pageSize, {
            id: "serial",
            header: () => "#",
            cell: (info) => <span className="font-medium dark:text-white ">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petImage", {
            header: () => "Image",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="Pet"
                    className="w-20 h-12 rounded-lg object-cover border border-gray-200"
                />
            ),
        }),
        columnHelper.accessor("petName", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Pet Name <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="font-medium dark:text-white text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petCategory", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Category <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="dark:text-white text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("petLocation", {
            header: () => (
                <div className="flex items-center gap-1 cursor-pointer">
                    Location <ArrowUpDown size={14} className="dark:text-white text-gray-500" />
                </div>
            ),
            cell: (info) => <span className="dark:text-white text-gray-700">{info.getValue()}</span>,
        }),
        columnHelper.accessor("adopted", {
            header: () => "Mark Status",
            cell: (info) => (
                <div className="flex gap-1">
                    <Button
                        size="sm"
                        variant={info.getValue() ? "filled" : "outlined"}
                        color="green"
                        className={`px-2 py-1 text-xs ${info.getValue() ? "" : "opacity-50"}`}
                        onClick={() => mutateUpdatePetStatus({ petData: info.row.original, adopted: true })}
                    >
                        Adopted
                    </Button>
                    <Button
                        size="sm"
                        variant={!info.getValue() ? "filled" : "outlined"}
                        color="amber"
                        className={`px-2 py-1 text-xs ${!info.getValue() ? "" : "opacity-50"}`}
                        onClick={() => mutateUpdatePetStatus({ petData: info.row.original, adopted: false })}
                    >
                        Not adopted
                    </Button>
                </div>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const pet = row.original;
                return (
                    <div className="flex gap-2">
                        <Tooltip content="Edit Pet">
                            <IconButton
                                variant="text"
                                color="blue"
                                onClick={() => navigate(`/dashboard/update-pet/${pet._id}`)}
                            >
                                <Edit size={16} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Pet">
                            <IconButton
                                variant="text"
                                color="red"
                                onClick={() => {
                                    setPetToDelete(pet);
                                    setDeleteDialog(true);
                                }}
                            >
                                <Trash2 size={16} />
                            </IconButton>
                        </Tooltip>
                        {pet.addedBy && (
                            <Tooltip content="View Owner">
                                <IconButton
                                    variant="text"
                                    color="purple"
                                    onClick={() => handleViewUser(pet.addedBy)}
                                >
                                    <User size={16} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: petsData || [],
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
                <Typography variant="h4" className="font-bold dark:text-white text-gray-900">
                    All Pets
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="dark:text-white text-gray-600">
                            Show:
                        </Typography>
                        <Select
                            value={pagination.pageSize.toString()}
                            onChange={handlePageSizeChange}
                            className="!min-w-20 dark:text-white "
                        >
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                            <Option value="25">25</Option>
                        </Select>
                        <Typography variant="small" className="dark:text-white text-gray-600">
                            entries
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="select-none px-6 py-4 text-left text-sm font-semibold dark:text-white text-gray-700 uppercase tracking-wider cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {petsLoading && <TableSkeleton />}
                        {!petsLoading && !petsData?.length && (
                            <NoDataFoundTable message={"No pets found in the system."} />
                        )}
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900 transition-colors">
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 dark:bg-gray-700 bg-gray-50 rounded-lg">
                <div>
                    <Typography variant="small" className="dark:text-white text-gray-600">
                        Showing{" "}
                        <span className="font-semibold">
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold">
                            {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                countData || 0
                            )}
                        </span>{" "}
                        of <span className="font-semibold">{countData || 0}</span> pets
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
                            } else if (
                                table.getState().pagination.pageIndex >=
                                table.getPageCount() - 3
                            ) {
                                pageNumber = table.getPageCount() - 5 + i;
                            } else {
                                pageNumber = table.getState().pagination.pageIndex - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNumber}
                                    variant={
                                        table.getState().pagination.pageIndex === pageNumber
                                            ? "filled"
                                            : "text"
                                    }
                                    size="sm"
                                    onClick={() => table.setPageIndex(pageNumber)}
                                    className={`rounded-full ${table.getState().pagination.pageIndex === pageNumber
                                        ? "bg-primary"
                                        : ""
                                        }`}
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog} handler={() => setDeleteDialog(false)}>
                <DialogHeader>Confirm Deletion</DialogHeader>
                <DialogBody>
                    Are you sure you want to delete {petToDelete?.petName}? This action cannot be undone.
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setDeleteDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => {
                            mutateDeletePet(petToDelete._id);
                            setDeleteDialog(false);
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Gorgeous User Profile Modal */}
<Dialog 
  open={userModal}
  handler={() => setUserModal(false)}
  size="md"
  className="rounded-2xl overflow-hidden backdrop-blur-sm"
  animate={{
    mount: { scale: 1, opacity: 1 },
    unmount: { scale: 0.9, opacity: 0 },
  }}
>
  {/* Dialog Header with Gradient */}
  <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 shadow-lg">
    <div className="flex justify-between items-center w-full">
      <Typography variant="h3" color="white" className="font-bold">
        User Profile
      </Typography>
      <IconButton
        variant="text"
        color="white"
        size="sm"
        onClick={() => setUserModal(false)}
        className="hover:bg-white/20 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </IconButton>
    </div>
  </DialogHeader>

  {/* Dialog Content */}
  <DialogBody className="p-0 overflow-hidden">
    {selectedUser ? (
      <div className="flex flex-col md:flex-row">
        {/* Profile Sidebar */}
        <div className="bg-gradient-to-b from-indigo-50 to-purple-50 w-full md:w-1/3 p-6 flex flex-col items-center text-center border-r border-gray-200">
          <div className="relative mb-4">
            <Avatar
              src={selectedUser.photoURL || "/default-avatar.png"}
              alt="User"
              size="xxl"
              className="border-4 border-white shadow-xl ring-4 ring-indigo-100/50"
            />
            <div className="absolute -bottom-2 right-0">
              <Chip
                value={selectedUser.role || "user"}
                color={selectedUser.role === "admin" ? "indigo" : "purple"}
                className="capitalize font-bold shadow-md px-3 py-1.5"
              />
            </div>
          </div>

          <Typography variant="h4" className="font-bold dark:text-white text-gray-900 mt-2">
            {selectedUser.displayName || "No Name"}
          </Typography>
          <Typography variant="small" className="dark:text-white text-gray-600 mb-4">
            {selectedUser.email}
          </Typography>

          <div className="w-full bg-white rounded-xl p-4 shadow-sm mt-auto">
            <Typography variant="h6" color="blue-gray" className="font-semibold mb-2">
              Member Since
            </Typography>
            <Typography variant="paragraph" className="dark:text-white text-gray-700">
              {selectedUser.createdAt || "Unknown date"}
            </Typography>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6">
          <div className="space-y-6">
            {/* Contact Information Card */}
            <Card className="shadow-none border border-gray-200">
              <CardBody className="p-4">
                <Typography variant="h5" color="blue-gray" className="font-bold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </Typography>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Mail size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        Email Address
                      </Typography>
                      <Typography variant="paragraph" className="dark:text-white text-gray-800">
                        {selectedUser.email}
                      </Typography>
                    </div>
                  </div>

                  {selectedUser.phoneNumber && (
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Phone size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          Phone Number
                        </Typography>
                        <Typography variant="paragraph" className="dark:text-white text-gray-800">
                          {selectedUser.phoneNumber}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Additional Information Card */}
            <Card className="shadow-none border border-gray-200">
              <CardBody className="p-4">
                <Typography variant="h5" color="blue-gray" className="font-bold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Additional Information
                </Typography>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Last Active
                    </Typography>
                    <Typography variant="paragraph" className="dark:text-white text-gray-800">
                      {selectedUser.lastLogin || "Recently"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Pets Added
                    </Typography>
                    <Typography variant="paragraph" className="dark:text-white text-gray-800">
                      {selectedUser.petsCount || "0"}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <Typography variant="paragraph" color="blue-gray">
          Loading user profile...
        </Typography>
      </div>
    )}
  </DialogBody>

  {/* Dialog Footer */}
  <DialogFooter className="px-6 pb-6 pt-4 bg-gray-50 border-t border-gray-200">
    <div className="flex gap-3 w-full">
      <Button
        variant="outlined"
        color="blue-gray"
        onClick={() => setUserModal(false)}
        className="flex-1 hover:shadow-md"
      >
        Close
      </Button>
      <Button
        variant="gradient"
        color="indigo"
        className="flex-1 shadow-md hover:shadow-lg"
        onClick={() => {
          // Add action for message button
        }}
      >
        Send Message
      </Button>
    </div>
  </DialogFooter>
</Dialog>
        </div>
    );
};

export default AllPets;