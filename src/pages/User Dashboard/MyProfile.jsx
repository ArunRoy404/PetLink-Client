
import { Avatar, Typography, Card, CardBody, Button } from '@material-tailwind/react';
import { Mail, Phone, MapPin, User, Calendar, Briefcase, Globe, CreditCard, Shield } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const MyProfile = () => {
  const { firebaseUser, userRole } = useAuthContext();


  // Enhanced user data with additional fields
  const userData = {
    name: firebaseUser?.displayName || 'No name provided',
    email: firebaseUser?.email || 'No email provided',
    phone: firebaseUser?.phoneNumber || 'Not provided',
    photoURL: firebaseUser?.photoURL || '',
    address: firebaseUser?.address || 'Not provided',
    joinDate: firebaseUser?.metadata?.creationTime || 'Unknown',
    lastLogin: firebaseUser?.metadata?.lastSignInTime || 'Unknown',
    emailVerified: firebaseUser?.emailVerified ? 'Verified' : 'Not verified',
    // Additional mock data for dashboard
    role: userRole,
    membership: 'Active',
    country: 'United States',
    timezone: 'EST (UTC-05:00)',
  };

  return (
    <div className="w-full p-4 md:p-0">
      <Card className="shadow-none bg-transparent rounded-xl overflow-hidden">
        <CardBody className="p-0">
          {/* Profile Header with Background */}
          <div className="bg-gradient-to-r from-primary to-primary rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar
                src={userData.photoURL}
                alt={userData.name}
                size="xxl"
                className="border border-gray300"
                withBorder={true}
              />
              <div className="text-center md:text-left">
                <Typography variant="h3" className="font-bold mb-2">
                  {userData.name}
                </Typography>
                <Typography variant="paragraph" className="opacity-90">
                  {userData.role} • {userData.membership}
                  {/* {userRole} */}
                </Typography>
                {/* <div className="flex gap-4 mt-4 justify-center md:justify-start">
                  <Button variant="outlined" color="white" size="sm" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Message
                  </Button>
                  <Button variant="filled" color="white" size="sm" className="text-primary flex items-center gap-2">
                    <User className="w-4 h-4" /> Edit Profile
                  </Button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6 ">
            {/* Personal Information Section */}
            <Card className="shadow-none border border-gray-300 dark:bg-[#3b3162]">
              <CardBody className='dark:text-white'>
                <Typography variant="h5" className="mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Personal Information
                </Typography>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Email
                      </Typography>
                      <Typography variant="paragraph">
                        {userData.email}
                        {userData.emailVerified === 'Verified' ? (
                          <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Verified</span>
                        ) : (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Not verified</span>
                        )}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Phone
                      </Typography>
                      <Typography variant="paragraph">
                        {userData.phone}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Location
                      </Typography>
                      <Typography variant="paragraph">
                        {userData.address}
                        {/* <span className="text-sm text-gray-600 mt-1">{userData.country} • {userData.timezone}</span> */}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Account Information Section */}
            <Card className="shadow-none border border-gray-300 dark:bg-[#3b3162]">
              <CardBody className='dark:text-white'>
                <Typography variant="h5" className="mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Account Information
                </Typography>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Member Since
                      </Typography>
                      <Typography variant="paragraph">
                        {new Date(userData.joinDate).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Last Login
                      </Typography>
                      <Typography variant="paragraph">
                        {new Date(userData.lastLogin).toLocaleString()}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        Account Status
                      </Typography>
                      <Typography variant="paragraph">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          userData.membership === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {userData.membership}
                        </span>
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <Globe className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <Typography variant="small" className="font-normal">
                        User ID
                      </Typography>
                      <Typography variant="paragraph" className="text-sm break-all">
                        {firebaseUser?.uid || 'Not available'}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Additional Sections can be added here */}
          </div>

          {/* Action Footer */}
          {/* <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <Typography variant="small" className="text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue" size="sm">
                Download Data
              </Button>
              <Button variant="outlined" color="red" size="sm">
                Deactivate Account
              </Button>
            </div>
          </div> */}


        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfile;