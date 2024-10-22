class GuessValidatorController < ApplicationController
  def validate_guess
    guessed_icon = params[:guessedIcon]
    guessed_coordinates = params[:guessedCoordinates]

    guessed_x_coord = guessed_coordinates[:x]
    guessed_y_coord = guessed_coordinates[:y]

    icon = Icon.find_by(name: guessed_icon)
    Rails.logger.debug("guessed icon: #{guessed_icon}\n\nguessed x coord: #{guessed_x_coord}\n\nguessed y coord: #{guessed_y_coord}")

    # (guessedX >= lowX && guessedX <= highX) && (guessedY >= lowY && guessedY <= highY)

    if in_range(guessed_x_coord, icon.low_x, icon.high_x) && in_range(guessed_y_coord, icon.low_y, icon.high_y)
      Rails.logger.debug('correct')
      icon.update(found: true)
      render json: { valid: true }

      if Icon.all.all? { |icon| icon.found == true }
        Rails.logger.debug('game over')
        # stop timer, render json: {timer current as final time}
      end
    else
      Rails.logger.debug('incorrect')
      render json: { valid: false }
    end
  end

  private

  def in_range(guessed, low_bound, high_bound)
    guessed >= low_bound && guessed <= high_bound
  end
end
