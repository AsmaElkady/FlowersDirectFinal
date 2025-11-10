import { Row, Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import MyInput from "../../../../../components/Inputs/MyInput";

function PriceInventory() {
  const { register } = useFormContext();

  return (
    <>
      <div className="section">
        <Row>
        <Col>
         <div>
        <h5>Pricing</h5>
        <MyInput
          id="price"
          label="Price (EGP)"
          type="number"
          placeholder="150 EGP"
          {...register("price", { valueAsNumber: true })}
        />
      </div>

        </Col>
          <Col>
           <h5>Inventory</h5>
            <MyInput
              id="totalQuantity"
              label="Stock Quantity"
              type="number"
              placeholder="quantity"
              className="mb-3"
              {...register("totalQuantity", { valueAsNumber: true })}
            />
          </Col>
{/* 
          <Col>
            <label className="form-label">Stock Status</label>
            <select className="form-select w-75" disabled>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default PriceInventory;
