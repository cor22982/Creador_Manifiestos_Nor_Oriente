DELIMITER //

CREATE TRIGGER convert_weight_lb_to_kg
BEFORE INSERT ON packages
FOR EACH ROW
BEGIN
    SET NEW.weight_kg = NEW.weight_lb * 0.453592;
END;
//

DELIMITER ;
