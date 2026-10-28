/* ==========================================================================
   Local Care - Community Reviews & Photo Rating Engine Module
   Allows users to post verified reviews with star ratings, aspect tags,
   and simulated photo uploads that immediately update ratings in real-time.
   ========================================================================== */

window.ReviewEngine = (function () {
  'use strict';

  let activeBusiness = null;
  let currentRating = 5;
  let selectedTags = new Set();
  let uploadedPhotos = [];

  const ASPECT_TAGS = [
    '⚡ On-Time Arrival',
    '💎 Transparent Pricing',
    '🧤 Clean & Sanitized Kit',
    '🤝 Polite & Professional',
    '🔧 High Quality Parts',
    '🩺 Thorough Consultation',
    '🛡️ Followed Safety Protocols'
  ];

  function init() {
    renderReviewModal();
  }

  function openReviewModal(business) {
    activeBusiness = business;
    currentRating = 5;
    selectedTags.clear();
    uploadedPhotos = [];

    renderReviewModalContent();
    document.getElementById('writeReviewDialog')?.showModal();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function renderReviewModal() {
    if (document.getElementById('writeReviewDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'writeReviewDialog';
    dialog.className = 'app-dialog review-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper review-modal-wrapper">
        <div class="dialog-header">
          <div>
            <h3 class="dialog-title">Write a Verified Review</h3>
            <small id="reviewBizSubtitle" style="color: var(--text-secondary);">Share your genuine experience with the community</small>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('writeReviewDialog').close()">✕</button>
        </div>

        <form id="reviewSubmitForm" onsubmit="window.ReviewEngine.submitReview(event)">
          <div class="dialog-body review-modal-body" id="reviewModalBody"></div>

          <div class="dialog-footer">
            <button type="button" class="action-btn action-btn-ghost" onclick="document.getElementById('writeReviewDialog').close()">Cancel</button>
            <button type="submit" class="action-btn action-btn-primary">
              ⭐ Post Verified Review
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function renderReviewModalContent() {
    const body = document.getElementById('reviewModalBody');
    const sub = document.getElementById('reviewBizSubtitle');
    if (!body || !activeBusiness) return;

    if (sub) sub.textContent = `Reviewing: ${activeBusiness.name} (${activeBusiness.locality})`;

    body.innerHTML = `
      <!-- Star Rating Picker -->
      <div class="review-star-picker-section">
        <label class="form-label">How was your overall experience?</label>
        <div class="star-rating-row" id="starRatingRow">
          ${[1, 2, 3, 4, 5].map(star => `
            <button type="button" class="star-btn ${star <= currentRating ? 'active' : ''}" data-star="${star}" onclick="window.ReviewEngine.setRating(${star})">
              ★
            </button>
          `).join('')}
          <span class="star-verdict-label" id="starVerdictLabel">Exceptional (5.0 / 5)</span>
        </div>
      </div>

      <!-- Experience Tags -->
      <div class="review-tags-section" style="margin-top: 1.25rem;">
        <label class="form-label">What did you appreciate most? (Select all that apply)</label>
        <div class="aspect-tags-list">
          ${ASPECT_TAGS.map(tag => `
            <button type="button" class="aspect-tag-chip" onclick="window.ReviewEngine.toggleTag(this, '${tag}')">
              ${tag}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Review Textarea -->
      <div class="form-group" style="margin-top: 1.25rem;">
        <label class="form-label">Your Review & Comments *</label>
        <textarea id="reviewTextContent" class="form-textarea" rows="4" placeholder="Describe the service quality, diagnosis accuracy, technician punctuality, and overall value..." required></textarea>
      </div>

      <!-- Photo Attachment -->
      <div class="review-photos-section" style="margin-top: 1rem;">
        <label class="form-label">Attach Photos of Completed Work (Optional)</label>
        <div class="photo-upload-row">
          <button type="button" class="action-btn action-btn-outline" onclick="window.ReviewEngine.simulatePhotoUpload()">
            📷 Add Before/After Photos
          </button>
          <div id="reviewPhotoThumbnails" style="display: flex; gap: 0.5rem;"></div>
        </div>
      </div>
    `;
  }

  function setRating(rating) {
    currentRating = rating;
    const labels = {
      1: 'Needs Improvement (1.0 / 5)',
      2: 'Fair (2.0 / 5)',
      3: 'Good (3.0 / 5)',
      4: 'Very Good (4.0 / 5)',
      5: 'Exceptional (5.0 / 5)'
    };
    const row = document.getElementById('starRatingRow');
    if (row) {
      row.querySelectorAll('.star-btn').forEach(btn => {
        const starVal = parseInt(btn.getAttribute('data-star'), 10);
        btn.classList.toggle('active', starVal <= rating);
      });
      const verdict = document.getElementById('starVerdictLabel');
      if (verdict) verdict.textContent = labels[rating] || '';
    }
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function toggleTag(btn, tag) {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
      btn.classList.remove('active');
    } else {
      selectedTags.add(tag);
      btn.classList.add('active');
    }
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function simulatePhotoUpload() {
    const demoPhotos = [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80'
    ];
    uploadedPhotos.push(demoPhotos[uploadedPhotos.length % demoPhotos.length]);
    const thumbBox = document.getElementById('reviewPhotoThumbnails');
    if (thumbBox) {
      thumbBox.innerHTML = uploadedPhotos.map(url => `
        <img src="${url}" alt="Work preview" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-subtle);" />
      `).join('');
    }
    if (window.LocalCare) window.LocalCare.showToast('Work photo attached! 📷', 'info');
  }

  function submitReview(event) {
    event.preventDefault();
    if (!activeBusiness) return;

    const text = document.getElementById('reviewTextContent')?.value.trim();
    if (!text) return;

    const newReview = {
      author: 'Chethan B K (Verified Customer)',
      rating: currentRating,
      date: 'Just now',
      verifiedBooking: true,
      comment: text,
      tags: Array.from(selectedTags),
      photos: [...uploadedPhotos]
    };

    if (!activeBusiness.reviews) activeBusiness.reviews = [];
    activeBusiness.reviews.unshift(newReview);
    activeBusiness.reviewsCount = (activeBusiness.reviewsCount || 0) + 1;

    // Recalculate average rating
    const total = activeBusiness.reviews.reduce((acc, r) => acc + r.rating, 0);
    activeBusiness.rating = parseFloat((total / activeBusiness.reviews.length).toFixed(1));

    // Save to user reviews history for customer account
    try {
      const userReviews = JSON.parse(localStorage.getItem('localcare_user_reviews') || '[]');
      userReviews.unshift({
        ...newReview,
        businessId: activeBusiness.id,
        businessName: activeBusiness.name,
        businessImage: activeBusiness.image
      });
      localStorage.setItem('localcare_user_reviews', JSON.stringify(userReviews.slice(0, 20)));
    } catch (e) {
      console.warn('Failed saving user review history', e);
    }

    // Post to persistent backend REST API
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: activeBusiness.id,
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
        aspectTags: newReview.tags
      })
    }).catch(e => console.log('Offline/Local review saved'));

    document.getElementById('writeReviewDialog')?.close();

    if (window.SoundFX) window.SoundFX.playSuccess();
    if (window.LocalCare) {
      window.LocalCare.showToast('🎉 Review published! Thank you for helping your local community.', 'success');
      // Refresh current listings / detail modal
      window.LocalCare.refreshListings();
      if (window.LocalCare.openBusinessDetailModal) {
        window.LocalCare.openBusinessDetailModal(activeBusiness);
      }
    }
  }

  return {
    init,
    openReviewModal,
    setRating,
    toggleTag,
    simulatePhotoUpload,
    submitReview
  };
})();
