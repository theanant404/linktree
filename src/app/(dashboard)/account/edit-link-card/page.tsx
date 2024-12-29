'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, Mail, Phone, Plus, Trash2, Upload, Github } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import axios from 'axios'
import {UploadImage} from "@/helpers/Upload"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  avatar: z.any().optional(),
  avatarId:z.string().optional(),
  socialLinks: z.array(
    z.object({
      platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
      url: z.string().url().optional(),
    })
  ),
  otherLinks: z.array(
    z.object({
      title: z.string(),
      url: z.string().url().optional(),
      icon: z.enum(['Globe', 'Mail', 'Phone']),
    })
  ),
  theme: z.enum(['light', 'dark']),
  primaryColor: z.string(),
})

const socialIcons = {
  facebook: <Facebook />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  linkedin: <Linkedin />,
  youtube: <Youtube />,
  github:<Github/>,

  other:<Globe/>,
}

const otherIcons = {
  Globe: <Globe />,
  Mail: <Mail />,
  Phone: <Phone />,
}

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isdisabled,setIsdisabled]=useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Digital creator, coffee enthusiast, and tech geek. Follow me for daily inspiration and tech tips!',
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
      ],
      otherLinks: [
        { title: 'Website', url: 'https://www.johndoe.com', icon: 'Globe' },
        { title: 'Email', url: 'mailto:john@example.com', icon: 'Mail' },
        { title: 'Phone', url: 'tel:+1234567890', icon: 'Phone' },
      ],
      theme: 'light',
      primaryColor: '#6366f1',
    },
  })

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  })

  const { fields: otherFields, append: appendOther, remove: removeOther } = useFieldArray({
    control: form.control,
    name: "otherLinks",
  })

  // data from backend 
  useEffect(()=>{
    const getData=async ()=>{
      const responce=await axios.get("/api/get-usr-link-card-data")
      console.log(responce.data)
    }
    getData()
  },[])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsdisabled(true)
    console.log(values)
    if(!values.avatar){
      return null;
    }
    const formData = new FormData();
    formData.append("image",values.avatar)
    const uploadImageData = await UploadImage(formData);
    if(!uploadImageData?.public_id && !uploadImageData.image_Url){
      setIsdisabled(false)
      return null;
    }
    values.avatar=uploadImageData.image_Url;
    values.avatarId=uploadImageData.public_id;
    const responce=await axios.post("/api/save-usr-link-card-data",values)
    if(responce.status!==201){
      setIsdisabled(false)
    }
    console.log(responce)
    
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue('avatar', file)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can @mention other users and organizations to link to them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Avatar preview"
                          width={100}
                          height={100}
                          className=" rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                      <input
                        type="file"
                        onChange={(e) => {
                          handleAvatarChange(e)
                          onChange(e.target.files?.[0])
                        }}
                        accept="image/*"
                        className="hidden"
                        {...field}
                        ref={fileInputRef}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              {socialFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`socialLinks.${index}.platform`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-4 items-end mb-4">
                        <div>
                          <FormLabel>Platform</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(socialIcons).map(([name, icon]) => (
                                <SelectItem key={name} value={name}>
                                  <div className="flex items-center gap-2">
                                    {icon} {name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormField
                          control={form.control}
                          name={`socialLinks.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSocial(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" onClick={() => appendSocial({ platform: 'facebook', url: '' })}>
                <Plus className="mr-2 h-4 w-4" /> Add Social Link
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Other Links</h3>
              {otherFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end mb-4">
                  <FormField
                    control={form.control}
                    name={`otherLinks.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Link title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`otherLinks.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`otherLinks.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(otherIcons).map(([name, icon]) => (
                              <SelectItem key={name} value={name}>
                                <div className="flex items-center gap-2">
                                  {icon} {name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeOther(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendOther({ title: '', url: '', icon: 'Globe' })}>
                <Plus className="mr-2 h-4 w-4" /> Add Link
              </Button>
            </div>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dark Theme</FormLabel>
                    <FormDescription>
                      Enable dark theme for your profile
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'dark'}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 'dark' : 'light')
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="color" {...field} className="w-12 h-12 p-1 rounded" />
                      <Input {...field} placeholder="#000000" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Choose a primary color for your profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isdisabled}>Save Changes</Button>
          </form>
        </Form>
        <div>
          <h2 className="text-2xl font-bold mb-4">Profile Preview</h2>
          <Card className="w-full max-w-sm mx-auto" style={{
            backgroundColor: form.watch('primaryColor'),
            color: form.watch('theme') === 'dark' ? '#ffffff' : '#000000'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-xl font-semibold">{form.watch('name')}</p>
                  <p className="text-sm">@{form.watch('username')}</p>
                </div>
              </div>
              <p className="text-sm mb-4">{form.watch('bio')}</p>
              <div className="mb-4">
                <Label className="font-semibold mb-2">Social Media</Label>
                <div className="flex space-x-2">
                  {form.watch('socialLinks').map((link, index) => (
                    link.url && (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-current">
                        {socialIcons[link.platform]}
                      </a>
                    )
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold mb-2">Other Links</Label>
                <div className="space-y-2">
                  {form.watch('otherLinks').map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {otherIcons[link.icon as keyof typeof otherIcons]}
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-current hover:underline">
                        {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

