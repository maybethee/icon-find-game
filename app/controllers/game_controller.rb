class GameController < ApplicationController
  @@timer_start = nil

  def start
    Rails.logger.debug('timer started')
    @@timer_start = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    render json: { message: "Timer started: #{@@timer_start}" }
  end

  def validate_guess
    Rails.logger.debug("timer: #{@@timer_start}")
    guessed_icon = params[:guessedIcon]
    guessed_coordinates = params[:guessedCoordinates]

    guessed_x_coord = guessed_coordinates[:x]
    guessed_y_coord = guessed_coordinates[:y]

    icon = Icon.find_by(name: guessed_icon)
    Rails.logger.debug("guessed icon: #{guessed_icon}\n\nguessed x coord: #{guessed_x_coord}\n\nguessed y coord: #{guessed_y_coord}")

    if in_range(guessed_x_coord, icon.low_x, icon.high_x) && in_range(guessed_y_coord, icon.low_y, icon.high_y)
      Rails.logger.debug('correct')
      icon.update(found: true)

      if Icon.all.all? { |icon| icon.found == true }
        Rails.logger.debug('game over')
        timer_end = Process.clock_gettime(Process::CLOCK_MONOTONIC)

        if @@timer_start.nil?
          render json: { valid: true, message: "timer start was nil, final score can't be calculated" }
        else
          final_time = timer_end - @@timer_start
          Rails.logger.debug("Final score: #{final_time}")
          render json: { valid: true, message: 'Game over. Final score:', score: final_time }

          reset_icons
        end

      else
        render json: { valid: true }
      end
    else
      Rails.logger.debug('incorrect')
      render json: { valid: false }
    end
  end

  def score
    leaderboard 
  end

  private

  def reset_icons
    Icon.all.each { |icon| icon.update(found: false) }
  end

  def in_range(guessed, low_bound, high_bound)
    guessed >= low_bound && guessed <= high_bound
  end
end
