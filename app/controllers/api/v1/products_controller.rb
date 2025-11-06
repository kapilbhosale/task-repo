class Api::V1::ProductsController < ApplicationController
  # Skip CSRF token verification for API endpoints
  skip_before_action :verify_authenticity_token

  before_action :set_product, only: [:show, :update, :destroy]

  # GET /api/v1/products
  def index
    @products = Product.all
    render json: @products
  end

  # GET /api/v1/products/:id
  def show
    render json: @product
  end

  # POST /api/v1/products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/products/:id
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/products/:id
  def destroy
    product_name = @product.name
    @product.destroy
    render json: { message: "#{product_name} deleted successfully" }, status: :ok
  end

  private

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Product not found' }, status: :not_found
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :stock, :tags)
  end
end
