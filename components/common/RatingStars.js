import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const StarIcon = styled.View`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const RatingText = styled.Text`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-weight: 500;
`;

const ReviewCount = styled.Text`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export default function RatingStars({ 
  rating = 0, 
  maxRating = 5, 
  size = 16, 
  showRating = true, 
  showReviewCount = false,
  reviewCount = 0,
  color = '#FFD700',
  emptyColor = '#E2E8F0'
}) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;
      
      let iconName = 'star';
      if (isFilled) {
        iconName = 'star';
      } else if (isHalf) {
        iconName = 'star';
      } else {
        iconName = 'star';
      }

      stars.push(
        <StarIcon key={i}>
          <Feather
            name={iconName}
            color={isFilled ? color : emptyColor}
            size={size}
            style={{
              opacity: isHalf ? 0.5 : 1
            }}
          />
        </StarIcon>
      );
    }
    return stars;
  };

  return (
    <RatingContainer>
      <StarsContainer>
        {renderStars()}
      </StarsContainer>
      {showRating && (
        <RatingText>{rating.toFixed(1)}</RatingText>
      )}
      {showReviewCount && reviewCount > 0 && (
        <ReviewCount>({reviewCount})</ReviewCount>
      )}
    </RatingContainer>
  );
} 