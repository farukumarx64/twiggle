import { Button, Divider } from "@nextui-org/react"

export const Trial = () => {
  const handleClick = () => {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
 }
  return (
    <>
    <section className=" px-3 py-20 flex flex-col items-center justify-center gap-4">
      <h3 className="font-bold md:text-4xl text-3xl">Get your free access</h3>
      <span className="text-default-500 pb-7">Create your digital presence for free!</span>
      <Button radius="full" size="lg" className="bg-[#a1acfb] box-border w-36" onPress={handleClick}>Go For It!</Button>
    </section>
    <Divider orientation="horizontal" />
    </>
  )
}