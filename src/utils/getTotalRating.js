function calculateTotalRating(reviews) {
    let totalRating = 0;
    let totalRatingsCount = 0;

    for (const review of reviews) {
        if (review.rating !== undefined && !isNaN(review.rating)) {
            totalRating += review.rating;
            totalRatingsCount++;
        }
    }

    const averageRating = totalRatingsCount > 0 ? totalRating / totalRatingsCount : 0;

    const scaledRating = (averageRating / 5) * 5;

    return scaledRating;
};

export default calculateTotalRating;