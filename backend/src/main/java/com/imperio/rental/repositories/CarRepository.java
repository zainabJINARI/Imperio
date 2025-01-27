package com.imperio.rental.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.imperio.rental.entities.Car;

public interface CarRepository extends JpaRepository<Car,Long> {
	/**
     * Finds cars based on their availability status.
     *
     * @param available Boolean flag indicating whether to filter by available cars (true) or unavailable cars (false).
     * @param page The pagination information, including page number and size.
     * @return A paginated list of cars that match the availability criteria.
     */
	Page<Car> findByIsAvailable(boolean available, PageRequest page);

}
