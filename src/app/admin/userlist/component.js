import {
  Users,
  Eye,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  Star,
  X,
  CircleX,
} from "lucide-react";

export const sampleUsers = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    lastActive: "2024-09-20",
    totalInvested: 1280,
    currentBalance: 145.5,
    referrals: 15,
    status: "active",
    planHistory: ["Booster $80", "Booster $160", "Booster $320"],
    totalEarnings: 2450.75,
    avatar: "AC",
  },
];

export const UserModal = ({ user, onClose, onTurboPack, onBoosterPack }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white truncate">
                {user.memberid} ({user.name})
              </h3>
              <p className="text-gray-400 truncate">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Total Invested</p>
              <p className="text-sm sm:text-lg font-bold text-white">
                ${user.totalInvested}
              </p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Total Earnings</p>
              <p className="text-sm sm:text-lg font-bold text-white">
                ${user.totalEarnings}
              </p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Referrals</p>
              <p className="text-sm sm:text-lg font-bold text-white">
                {user.totDirect}
              </p>
            </div>
            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg text-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Current Balance</p>
              <p className="text-sm sm:text-lg font-bold text-white">
                ${user.currentBalance}
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-3">
                Personal Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm truncate">
                    {user.fullAdr}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm">{user.mobileno}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Joined Date: {user.joinDate}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Joiner Time {user.joinTime}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">JTurbo Plan</h4>
              <div className="space-y-2">
                {(() => {
                  let turboPlans = [];

                  try {
                    turboPlans =
                      typeof user.planHistoryTurbo === "string"
                        ? JSON.parse(user.planHistoryTurbo)
                        : user.planHistoryTurbo;
                  } catch (err) {
                    console.error("Error parsing planHistoryBooster:", err);
                  }

                  return turboPlans &&
                    Array.isArray(turboPlans) &&
                    turboPlans.length > 0 ? (
                    turboPlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 bg-gray-700 rounded 
                          ${plan.isbought == 1 ? "border border-green-400" : ""}
                          ${
                            plan.isbought == 0 && plan.isblock == 1
                              ? "border border-red-400"
                              : ""
                          }
                          `}
                      >
                        <span
                          className={` text-sm truncate
                           ${
                             plan.isbought == 1
                               ? "text-green-400"
                               : "text-gray-300"
                           }
                           ${
                             plan.isbought == 0 && plan.isblock == 1
                               ? "text-red-400"
                               : "text-gray-300"
                           }
                          `}
                        >
                          {plan.package}

                          <span
                            className={`px-2 py-0 ms-3 text-xs rounded-full border ${getStatusColor(
                              plan.isblock == 1 && plan.isbought == 0
                                ? "suspended"
                                : plan.isbought == 1
                                ? "active"
                                : "inactive"
                            )}`}
                          >
                            {plan.isblock == 1 && plan.isbought == 0
                              ? "Blocked"
                              : plan.isbought == 1
                              ? "Purchased"
                              : "Not Purchased"}
                          </span>
                        </span>

                        {plan.isbought == 1 && (
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        )}
                        {plan.isbought == 0 && plan.isblock == 0 && (
                          <button
                            onClick={() => {
                              onTurboPack(plan.packageId);
                            }}
                            className="flex items-center cursor-pointer justify-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md text-white transition-colors text-sm"
                          >
                            <CircleX className="w-4 h-4" />
                            Suspend
                          </button>
                        )}
                        {plan.isbought == 0 && plan.isblock == 1 && (
                          <button
                            onClick={() => {
                              onTurboPack(plan.packageId);
                            }}
                            className="flex cursor-pointer items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Activate
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No plan history available
                    </p>
                  );
                })()}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">
                Booster Plan
              </h4>
              <div className="space-y-2">
                {(() => {
                  let boosterPlans = [];

                  try {
                    boosterPlans =
                      typeof user.planHistoryBooster === "string"
                        ? JSON.parse(user.planHistoryBooster)
                        : user.planHistoryBooster;
                  } catch (err) {
                    console.error("Error parsing planHistoryBooster:", err);
                  }

                  return boosterPlans &&
                    Array.isArray(boosterPlans) &&
                    boosterPlans.length > 0 ? (
                    boosterPlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 bg-gray-700 rounded 
                          ${plan.isbought == 1 ? "border border-green-400" : ""}
                          ${
                            plan.isbought == 0 && plan.isblock == 1
                              ? "border border-red-400"
                              : ""
                          }
                          `}
                      >
                        <span
                          className={` text-sm truncate
                           ${
                             plan.isbought == 1
                               ? "text-green-400"
                               : "text-gray-300"
                           }
                           ${
                             plan.isbought == 0 && plan.isblock == 1
                               ? "text-red-400"
                               : "text-gray-300"
                           }
                          `}
                        >
                          {plan.package}

                          <span
                            className={`px-2 py-0 ms-3 text-xs rounded-full border ${getStatusColor(
                              plan.isblock == 1 && plan.isbought == 0
                                ? "suspended"
                                : plan.isbought == 1
                                ? "active"
                                : "inactive"
                            )}`}
                          >
                            {plan.isblock == 1 && plan.isbought == 0
                              ? "Blocked"
                              : plan.isbought == 1
                              ? "Purchased"
                              : "Not Purchased"}
                          </span>
                        </span>

                        {plan.isbought == 1 && (
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        )}
                        {plan.isbought == 0 && plan.isblock == 0 && (
                          <button
                            onClick={() => {
                              onBoosterPack(plan.packageId);
                            }}
                            className="flex items-center cursor-pointer justify-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md text-white transition-colors text-sm"
                          >
                            <CircleX className="w-4 h-4" />
                            Suspend
                          </button>
                        )}
                        {plan.isbought == 0 && plan.isblock == 1 && (
                          <button
                            onClick={() => {
                              onBoosterPack(plan.packageId);
                            }}
                            className="flex cursor-pointer items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Activate
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No plan history available
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={() => {
                handleUserAction("activate", user.id);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Activate
            </button>
            <button
              onClick={() => {
                handleUserAction("suspend", user.id);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors text-sm"
            >
              <Ban className="w-4 h-4" />
              Suspend
            </button>
            <button
              onClick={() => {
                handleUserAction("promote", user.id);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors text-sm"
            >
              <Star className="w-4 h-4" />
              Promote Tier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileActionMenu = ({ user, onClose }) => {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-t-xl p-4 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">User Actions</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowUserModal(true);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 text-left bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          <button
            onClick={() => {
              handleUserAction("activate", user.memberid);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 text-left bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Activate
          </button>
          <button
            onClick={() => {
              handleUserAction("suspend", user.memberid);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 text-left bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            <Ban className="w-4 h-4" />
            Suspend
          </button>
          <button
            onClick={() => {
              handleUserAction("promote", user.memberid);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 text-left bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <Star className="w-4 h-4" />
            Promote Tier
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "text-green-400 bg-green-900/20 border-green-800";
    case "inactive":
      return "text-gray-400 bg-gray-900/20 border-gray-800";
    case "suspended":
      return "text-red-400 bg-red-900/20 border-red-800";
    case "pending":
      return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
    default:
      return "text-gray-400 bg-gray-900/20 border-gray-800";
  }
};

export const getTierColor = (tier) => {
  switch (tier) {
    case "VIP":
      return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
    case "Premium":
      return "text-purple-400 bg-purple-900/20 border-purple-800";
    case "Basic":
      return "text-blue-400 bg-blue-900/20 border-blue-800";
    default:
      return "text-gray-400 bg-gray-900/20 border-gray-800";
  }
};

export const handleUserAction = (action, userId) => {
  setUsers((prev) =>
    prev.map((user) => {
      if (user.memberid === userId) {
        switch (action) {
          case "activate":
            return { ...user, status: "active" };
          case "suspend":
            return { ...user, status: "suspended" };
          case "promote":
            const tiers = ["Basic", "Premium", "VIP"];
            const currentIndex = tiers.indexOf(user.tier);
            return {
              ...user,
              tier: currentIndex < 2 ? tiers[currentIndex + 1] : user.tier,
            };
          default:
            return user;
        }
      }
      return user;
    })
  );
  setShowActionMenu(null);
};
