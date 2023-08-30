class TestResultsController < ApplicationController
  load_and_authorize_resource

  # def show
  #   render json: @test_result
  # end

  def create
    test_result = TestResult.create(test_result_params)
    if test_result.valid?
      render json: test_result, status: :created
    else
      render json: {
               errors: test_result.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    if @test_result.update(test_result_update_params)
      render json: @test_result
    else
      render json: {
               errors: @test_result.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  private

  def test_result_params
    params.require(:test_result).permit(:patient_id, :test_name, :result)
  end

  def test_result_update_params
    params.require(:test_result).permit(:result)
  end
end
