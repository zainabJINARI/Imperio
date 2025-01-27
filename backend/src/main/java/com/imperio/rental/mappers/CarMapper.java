package com.imperio.rental.mappers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.entities.Car;

@Service
public class CarMapper {
	
	 /**
     * Converts a CarDto object to a Car entity.
     * Saves the car image to the local file system and sets the image path in the Car entity.
     *
     * @param car CarDto object containing car details.
     * @return A Car entity with mapped attributes from CarDto.
     * @throws IOException If there is an issue creating directories or saving the image file.
     */
	public Car fromCarDto(CarDto car) throws IOException {
        // Define the directory path for storing car images
		Path path = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images");
		
		   // Create directories if they do not exist
		if(!Files.exists(path)) {
			Files.createDirectories(path);
		}
	    // Generate a unique image ID for the car image
		String imageId = UUID.randomUUID().toString();
		Path imagePath = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images",imageId+".png");
		  // Save the uploaded image to the defined location
		Files.copy(car.getPicture().getInputStream(),imagePath);
		
		
		
		// Create a Car entity and map the fields from CarDto
		Car returnedCar =Car.builder()
				.brand(car.getBrand())
				.model(car.getModel())
				.pricePerDay(car.getPricePerDay())
				.picture(imagePath.toUri().toString())
				.build();

        // Set the car ID if it's not null (used for updating existing cars)
		if(car.getId()!=null) {
			returnedCar.setId(car.getId());
		}
		
		  // If the car is explicitly marked as unavailable, set it accordingly.
        // Otherwise, default availability to true.
		if(car.getIsAvailable()!= null &&  !car.getIsAvailable()) {
			
			returnedCar.setAvailable(false);
		}else {
			returnedCar.setAvailable(true);
		}
		
		return returnedCar;
	}

}
