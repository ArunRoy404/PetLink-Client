import { Avatar, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Users } from "lucide-react";

const DonatorsDialog = ({ open, closeFn, name, donators }) => {
    return (
        <Dialog open={open} handler={()=>closeFn()} size="sm">
            <DialogHeader className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Donators for {name}
            </DialogHeader>
            <DialogBody className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                    {donators.map((donator) => (
                        <div key={donator.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src={donator.userImage}
                                    alt={donator.userName}
                                    size="sm"
                                />
                                <div>
                                    <Typography variant="small" className="font-medium">
                                        {donator.userName}
                                    </Typography>
                                    <Typography variant="small" className="text-gray-600">
                                        {new Date(donator.donationDate).toLocaleDateString()}
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant="small" className="font-bold text-green-600">
                                ${donator.amount.toLocaleString()}
                            </Typography>
                        </div>
                    ))}
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="gradient bg-primary"  onClick={()=>closeFn()}>
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DonatorsDialog;