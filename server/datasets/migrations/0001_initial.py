# Generated by Django 5.0.6 on 2024-07-26 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DecimalField(decimal_places=6, max_digits=10)),
                ('pressure', models.DecimalField(decimal_places=2, max_digits=10)),
                ('temperature', models.DecimalField(decimal_places=2, max_digits=10)),
                ('depth', models.DecimalField(decimal_places=2, max_digits=10)),
                
            ],
        ),
    ]
