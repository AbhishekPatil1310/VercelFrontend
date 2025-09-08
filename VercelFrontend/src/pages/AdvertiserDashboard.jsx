import React, { useEffect, useState } from 'react';
import { fetchMyAds, deleteAd } from '../api/addApi';

export default function AdvertiserDashboard() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const fetchedAds = await fetchMyAds();
        setAds(fetchedAds);
      } catch (err) {
        // Error already logged in API file
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);

  const handleDelete = async (adId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
    console.log('ad in delete:',adId)
    if (!confirmDelete) return;

    try {
      await deleteAd(adId);
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Failed to delete ad. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading your ads...</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-6">Your Ads Dashboard</h1>

      {ads.length === 0 ? (
        <p>No ads found. Create one to get started!</p>
      ) : (
        ads.map((ad) => (
          <div key={ad._id} className="bg-white rounded-lg p-6 mb-6 shadow relative">
            <div className="flex gap-4 items-center">
              <img src={ad.imageUrl} alt="Ad" className="w-32 h-auto rounded" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{ad.description}</h2>
                <p className="text-sm text-gray-600">Views: {ad.views}</p>
                <p className="text-sm text-gray-600">
                  Feedback Count: {ad.feedbacks.length}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(ad._id)}
                className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                
              >
                Delete
              </button>
            </div>

            {ad.feedbacks.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Feedback:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {ad.feedbacks.map((fb, i) => (
                    <li key={i}>
                      <strong>{fb.userId?.name || 'Unknown'}:</strong>{' '}
                      <em>({fb.sentiment || 'not reacted'})</em> – {fb.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
