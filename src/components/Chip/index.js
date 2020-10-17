import PinOut from '../PinOut';

export default function Chip({ chip }) {
  return (
    <>
      <h1>
        {chip.name} - {chip.alias}
      </h1>
      <p>{chip.description}</p>
      <PinOut pins={chip.pins} />
    </>
  );
}
