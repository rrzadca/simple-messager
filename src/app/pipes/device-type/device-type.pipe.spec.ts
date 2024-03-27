import {DeviceTypePipe} from "./device-type.pipe";
import {DeviceType} from "../../api/models/device-type";

describe('DeviceTypePipe', () => {
  it('create an instance', () => {
    const pipe = new DeviceTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if value is null', () => {
    const pipe = new DeviceTypePipe();
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return Field Device if value is FIELD', () => {
    const pipe = new DeviceTypePipe();
    expect(pipe.transform(DeviceType.FIELD)).toBe('Field Device');
  });

  it('should not transform value when type is unknown', () => {
    const pipe = new DeviceTypePipe();
    expect(pipe.transform('UNKNOWN_TYPE' as any)).toBe('UNKNOWN_TYPE');
  });
});
