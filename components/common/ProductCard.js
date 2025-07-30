import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';

const Card = styled.View`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 0;
  margin: 0;
  width: 100%;
  border: 1px solid #E2E8F0;
  box-shadow: 3px 12px 25px rgba(0, 0, 0, 0.56);
  elevation: 20;
  overflow: hidden;
`;

const ImageContainer = styled.View`
  position: relative;
  height: 140px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const WishlistButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.95);
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const DiscountBadge = styled.View`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #E94F8A;
  padding: 6px 10px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 3;
`;

const DiscountText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const ProductInfo = styled.View`
  padding: 12px 16px 16px 16px;
`;

const Name = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 2px;
  line-height: 18px;
  letter-spacing: 0.2px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const RatingText = styled.Text`
  font-size: 11px;
  color: #64748B;
  margin-left: 6px;
  font-weight: 500;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PriceContainer = styled.View`
  flex: 1;
`;

const AddToCartButton = styled.TouchableOpacity`
  background-color: #4CB7A5;
  border-radius: 8px;
  padding: 10px 16px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const AddToCartText = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const Price = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #4CB7A5;
  letter-spacing: 0.3px;
`;

const OriginalPrice = styled.Text`
  font-size: 13px;
  color: #94A3B8;
  text-decoration-line: line-through;
  margin-left: 8px;
  font-weight: 500;
`;

export default function ProductCard({ 
  image, 
  name, 
  price, 
  originalPrice, 
  discount, 
  rating = 4.5, 
  onWishlist,
  isWishlisted = false,
  style = {},
  onPress,
  showAddToCart = false,
  onAddToCart,
  isInCart = false
}) {
  const cardInner = (
    <>
      <ImageContainer>
        <ProductImage source={image} resizeMode="cover" />
        <WishlistButton 
          onPress={onWishlist} 
          activeOpacity={0.8}
          style={{
            backgroundColor: isWishlisted ? '#FDF2F8' : 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Feather 
            name={isWishlisted ? "heart" : "heart"} 
            size={18} 
            color={isWishlisted ? "#E94F8A" : "#64748B"} 
          />
        </WishlistButton>
        {discount && (
          <DiscountBadge>
            <DiscountText>-{discount}%</DiscountText>
          </DiscountBadge>
        )}
      </ImageContainer>
      <ProductInfo>
        <Name numberOfLines={2}>{name}</Name>
        <RatingContainer>
          <RatingStars rating={rating} size={12} showRating={false} />
          <RatingText>({rating})</RatingText>
        </RatingContainer>
        <PriceRow>
          <PriceContainer>
            <Price>${price}</Price>
            {originalPrice && originalPrice > price && (
              <OriginalPrice>${originalPrice}</OriginalPrice>
            )}
          </PriceContainer>
        </PriceRow>
        {showAddToCart && (
          <AddToCartButton 
            onPress={onAddToCart} 
            activeOpacity={0.8}
            style={{
              backgroundColor: isInCart ? '#E8F5F3' : '#4CB7A5'
            }}
          >
            <AddToCartText style={{
              color: isInCart ? '#4CB7A5' : '#FFFFFF'
            }}>
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </AddToCartText>
          </AddToCartButton>
        )}
      </ProductInfo>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={style}>
        <Card>{cardInner}</Card>
      </TouchableOpacity>
    );
  }
  return <Card style={style}>{cardInner}</Card>;
} 