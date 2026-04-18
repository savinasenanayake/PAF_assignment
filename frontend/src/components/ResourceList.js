import React from "react";
import { FiTrash2, FiMapPin, FiUsers, FiTag } from "react-icons/fi";

function ResourceList({ resources, deleteResource, loading }) {
  const getStatusBadge = (status) => {
    if (status === "AVAILABLE") {
      return <span className="badge-success">✓ Available</span>;
    } else if (status === "UNAVAILABLE") {
      return <span className="badge-danger">✗ Unavailable</span>;
    } else {
      return <span className="badge-warning">⚠ {status}</span>;
    }
  };

  const SkeletonCard = () => (
    <div className="card p-6 animate-pulse">
      <div className="skeleton h-6 w-3/4 mb-4 rounded"></div>
      <div className="space-y-3">
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-5/6 rounded"></div>
        <div className="skeleton h-4 w-4/6 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Resources
      </h2>

      {loading && resources.length === 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No resources found. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {resources.map((r) => (
            <div
              key={r.id}
              className="card p-6 hover:shadow-lg transition-all duration-200 animate-slide-up"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {r.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 text-xs font-medium rounded">
                      <FiTag className="inline mr-1" />
                      {r.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-primary-500" />
                      <span className="font-medium">{r.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-primary-500" />
                      <span>Capacity: <span className="font-medium">{r.capacity}</span></span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status:
                    </span>
                    {getStatusBadge(r.status)}
                  </div>
                </div>

                <button
                  onClick={() => deleteResource(r.id)}
                  className="btn-icon text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  title="Delete resource"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceList;