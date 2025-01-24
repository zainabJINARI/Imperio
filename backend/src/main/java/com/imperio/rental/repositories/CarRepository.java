package com.imperio.rental.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imperio.rental.entities.Car;

public interface CarRepository extends JpaRepository<Car,Long> {

}
